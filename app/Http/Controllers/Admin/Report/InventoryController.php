<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(){

    }
}


// 📦 2. INVENTORY DASHBOARD
// 🔹 KPIs
// Metric	Description
// 🏷️ Total Materials	Count of materials
// ⚠️ Low Stock Items	Materials below min_stock
// 🛒 Total Purchases This Month	From purchases
// 📈 Total Stock Value	SUM(price * stock_quantity)


// 🔹 Charts

// Stock Movements Over Time (Line chart)
// Show incoming (purchases) vs outgoing (consumptions).

// Stock Value by Category (Bar chart)
// Group materials by category, sum total stock value.

// Top 5 Suppliers by Purchase Volume (Horizontal bar chart)
// Join purchases and suppliers.


// Current Stock	Material name, Brand, Category, Quantity, Min Stock, Status	Filter by Category
// Purchase History	Date, Supplier, Total Amount, Status	Filter by Date range
// Stock Movements Log	Date, Type, Quantity, Material, Reason	Filter by Material
