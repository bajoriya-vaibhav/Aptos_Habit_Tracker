module account_addr::user {
    use std::signer;

    const MAX_EXP_PER_LEVEL: u64 = 50;    
    const MAX_HEALTH_PER_LEVEL: u64 = 50;

    // User struct (no visibility modifier needed)
    struct User has key {
        health: u64,
        exp: u64,
        level: u64,
        address: address,
        max_exp: u64,
        max_health: u64
    }

    // Getter function for health
    public fun get_health(account: address): u64 acquires User {
        let user = borrow_global<User>(account);
        user.health
    }

    // Getter function for experience points
    public fun get_exp(account: address): u64 acquires User {
        let user = borrow_global<User>(account);
        user.exp
    }

    // Getter function for level
    public fun get_level(account: address): u64 acquires User {
        let user = borrow_global<User>(account);
        user.level
    }

    // Function to create a new user and move it to storage
    public entry fun create_user(account: &signer) {
        let init_health = 10;
        let init_exp = 0;
        let init_level = 1;
        let signer_address = signer::address_of(account);

        let user = User {
            health: init_health,
            exp: init_exp,
            level: init_level,
            address: signer_address,
            max_exp: MAX_EXP_PER_LEVEL,
            max_health: MAX_HEALTH_PER_LEVEL
        };
        move_to(account, user);
    }

    // Public function to add experience points
    public fun add_experience(account: address, exp_gain: u64) acquires User {
        let user = borrow_global_mut<User>(account);
        user.exp = user.exp + exp_gain;
        if (user.exp >= MAX_EXP_PER_LEVEL) {
            user.exp = user.exp - MAX_EXP_PER_LEVEL;
            
            // Level up the user
            user.health = MAX_HEALTH_PER_LEVEL;
            user.level = user.level + 1;
        }
    }

    // Public function to apply health penalty
    public fun apply_health_penalty(account: address, health_drop: u64) acquires User {
        let user = borrow_global_mut<User>(account);
        user.health = if (user.health > health_drop) {
            user.health - health_drop
        } else {
            0
        };
    }
}


module account_addr::todolist {
	use aptos_framework::event;
	use std::signer;
	use aptos_std::table::{Self, Table};
	use aptos_framework::account;
	use account_addr::user;
	use std::string::{Self, String}; 

	// Errors
	const E_NOT_INITIALIZED: u64 = 1;
	const ETASK_DOESNT_EXIST: u64 = 2;
	const ETASK_IS_COMPLETED: u64 = 3;
	const E_ALREADY_INITIALIZED: u64 = 4;
	struct TodoList has key {
		tasks: Table<u64, Task>,
		task_counter: u64
	}
	#[event]
	struct Task has store, drop, copy {
		task_id: u64,
		address: address,
		content: String,
		health_drop: u64,
		completed: bool,
		exp_gain: u64,
		createdAt: u64,
		duration: u64 
	}

	public entry fun create_list(account: &signer) {
        let todo_list = TodoList {
            tasks: table::new(),
            task_counter: 0
        };
        // move the TodoList resource under the signer account
        move_to(account, todo_list);
    }

	public entry fun create_task(account: &signer, content: String, timestamp: u64, duration: u64) acquires TodoList {
		let signer_address = signer::address_of(account);
		
		// assert signer has created a list
		assert!(exists<TodoList>(signer_address), E_NOT_INITIALIZED);
		
		let todo_list = borrow_global_mut<TodoList>(signer_address);

		let counter = todo_list.task_counter + 1;
		let new_task = Task {
			task_id: counter,
			address: signer_address,
			content,
			completed: false,
			exp_gain: 10,
			health_drop: 10,
			createdAt: timestamp,
			duration: duration
		};

		table::upsert(&mut todo_list.tasks, counter, new_task);
		todo_list.task_counter = counter;

		event::emit(new_task);
	}

	public entry fun complete_task(account: &signer, task_id: u64) acquires TodoList {
        // gets the signer address
        let signer_address = signer::address_of(account);
        // assert signer has created a list
        assert!(exists<TodoList>(signer_address), E_NOT_INITIALIZED);
        // gets the TodoList resource
        let todo_list = borrow_global_mut<TodoList>(signer_address);
        // assert task exists
        assert!(table::contains(&todo_list.tasks, task_id), ETASK_DOESNT_EXIST);
        // gets the task matched the task_id
        let task_record = table::borrow_mut(&mut todo_list.tasks, task_id);
        // assert task is not completed
        assert!(task_record.completed == false, ETASK_IS_COMPLETED);
        // update task as completed
        task_record.completed = true;
    }

	// Check and apply task completion effects on the user
	public entry fun is_task_completed(account: &signer, task_id: u64, timestamp: u64) acquires TodoList {
		let signer_address = signer::address_of(account);
		let todo_list = borrow_global_mut<TodoList>(signer_address);
		let task_record = table::borrow_mut(&mut todo_list.tasks, task_id);
		if (task_record.createdAt + task_record.duration > timestamp) {  
			if (task_record.completed) {
				user::add_experience(signer_address, task_record.exp_gain);
			} else {
				user::apply_health_penalty(signer_address, task_record.health_drop);
			}
		}
	}



	// tests
	#[test(admin = @0x123)]
	public entry fun test_flow(admin: signer) acquires TodoList {
		// creates an admin @todolist_addr account for test
		account::create_account_for_test(signer::address_of(&admin));
		// initialize contract with admin account
		create_list(&admin);

		user::create_user(&admin);

		
		// creates a task by the admin account
		create_task(&admin, string::utf8(b"New Task"), 1292834023,3600);
		let task_count = event::counter(&borrow_global<TodoList>(signer::address_of(&admin)).set_task_event);
		assert!(task_count == 1, 4);
		let todo_list = borrow_global<TodoList>(signer::address_of(&admin));
		assert!(todo_list.task_counter == 1, 5);
		let task_record = table::borrow(&todo_list.tasks, todo_list.task_counter);
		assert!(task_record.task_id == 1, 6);
		assert!(task_record.completed == false, 7);
		assert!(task_record.content == string::utf8(b"New Task"), 8);
		assert!(task_record.address == signer::address_of(&admin), 9);
		
		is_task_completed(&admin, 1, 12);

		// let user = borrow_global<user::User>(signer::address_of(&admin));
		// assert!(user::get_health(signer_address) == 40, 11);


		// updates task as completed
		complete_task(&admin, 1);
		let todo_list = borrow_global<TodoList>(signer::address_of(&admin));

		assert!(todo_list.task_counter == 0, 10);
	}

}