# bamazon

## Bamazon Customer

- Node.js app which will display a list of available items and prompt the customer to select which item they wish to order and how many. 

The app will check to make sure there are enough of the item in stock to meet the order. 
    - If there are, the order will go through and the total price will be displayed. 
    - If there are not, the order will not go through and the customer will be alerted.

![ItemDisplay](/images/01-Customer-Item-Display.png)
![Order](/images/02-Customer-Order.png)


## Bamazon Manager

![ManagerOptions](/images/03-Manager-Options.png)
- A node.js app for managers with the following options:
    - View Products for Sale
        - The Product ID, Product Name, Department Name, Price, and Stock Quantity will be displayed for each item.
        ![ViewItems](/images/04-Manager-View-Products.png)
    - View Low Inventory
        - Only displays items with a stock quantity less than 5.
        ![ViewLowInventory](/images/05-Manager-View-Low-Inventory.png)
    - Add to Inventory
        - allows managers to add to an item's stock quantity
        ![ViewAddInventory](/images/06-Manager-Add-Inventory.png)
    - Add New Product
        - allows managers to add a new product to the available items
        ![AddNewProduct](/images/07-Manager-Add-New-Product.png)
        ![DisplayWithNew](/images/08-Manager-Display-with-New.png)

## Bamazon Demo
https://drive.google.com/file/d/1GsDxwRLClrhZr-yQjR4HPASpkPY34fjm/view