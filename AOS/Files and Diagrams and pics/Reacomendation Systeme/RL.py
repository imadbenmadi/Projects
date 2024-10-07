import numpy as np
import random

# Define the number of bandit machines (your website's categories)
num_bandits = 3

# Simulate interactions
num_iterations = 20

# Initialize Q-values with an initial value of 1
q_values = np.full((num_bandits), 1.0)

# Set exploration parameters
epsilon = 1  # Exploration rate

# Define a table of categories and their products (brands and models)
category_products = {
    "watches": ["Rolex Submariner", "Apple Watch Series 7", "TAG Heuer Carrera"],
    "sunglasses": ["Ray-Ban Wayfarer", "Oakley Holbrook", "Gucci GG0061S"],
    "hats": ["New Era 59FIFTY", "Nike Aerobill Featherlight", "Brixton Wesley Fedora"],
    # Add more categories and products as needed
}

# Create a dictionary to map user categories to indices with matching order
category_indices = {category: i for i, category in enumerate(category_products.keys())}

# Print to verify
print("User Categories:", category_indices)

# Initialize counts and rewards
action_counts = np.zeros((num_bandits))
total_rewards = np.zeros((num_bandits))

# Define user categories
user_categories = list(category_products.keys())

# Define initial user interest
user_interest = "sunglasses"


# Define a function to choose a product based on epsilon-greedy policy
def select_action(user_category):
    if np.random.rand() < epsilon:
        return random.choice(category_products[random.choice(list(category_products.keys()))])
    else:
        best_bandit = np.argmax(q_values[:])
        selected_category = user_categories[best_bandit]
        products_in_category = category_products[selected_category]
        # Exploitation: Randomly select a product from the chosen category
        return random.choice(products_in_category)

    # Define initial user interests
user_interests = random.sample(user_categories, 2)
current_user_interest = user_interests[0]

for iteration in range(num_iterations):
    # Choose the user category based on the current interest index
    user_category = user_categories[np.argmax(q_values)]

    # Display messages based on iteration
    if iteration == 0:
        print(f"You are a user that likes, for example, {current_user_interest}.")
        print("Whenever I recommend, provide a value between 0 and 1 simulating your interest.")
    elif iteration == num_iterations // 2:
        user_interests.remove(current_user_interest)
        current_user_interest = user_interests[0]
        print(f"To see whether the algorithm adapts to changing interest, from now on you want {current_user_interest} (different from the first interest).")

    # Choose a product based on the user's category
    chosen_product = select_action(user_category)

    for category, products in category_products.items():
        if chosen_product in products:
            chosen_category = category
            break

    # Display the recommended product and its category in the console
    print(f"I recommend: {chosen_product}  ({chosen_category})")

    # Read reward from the user
    reward = float(input("Please enter the reward for this product (0.0 - 1.0): "))

    # Update counts and rewards
    action_counts[category_indices[chosen_category]] += 1
    total_rewards[category_indices[chosen_category]] += reward

    # Update Q-values with a weighted average
    alpha = 0.1
    q_values[category_indices[chosen_category]] += alpha * (reward - q_values[category_indices[chosen_category]])

    # Decay exploration rate
    epsilon = epsilon/(iteration+1)

    # Display user interest at this iteration
    print("User Interest (Q-Values):")
    print(q_values)
# Find the best product for each category at this iteration
best_products = {}
for user_category in user_categories:
    best_bandit = np.argmax(q_values)
    best_products[user_category] = category_products[user_category][best_bandit]

# Display the best category and product at this iteration
print("Best Choices at This Iteration:")
for user_category in user_categories:
    print(f"Category: {user_category}, Best Product: {best_products[user_category]}")