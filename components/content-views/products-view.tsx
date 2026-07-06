'use client'

import { Plus, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'

const products = [
  { id: 1, name: 'Advanced React Course', price: '₹99', students: 1243, rating: 4.8, status: 'active' },
  { id: 2, name: 'Web Design Masterclass', price: '₹149', students: 856, rating: 4.9, status: 'active' },
  { id: 3, name: 'JavaScript Bundle', price: '₹199', students: 2341, rating: 4.7, status: 'active' },
  { id: 4, name: 'UI/UX Design Basics', price: '₹79', students: 542, rating: 4.6, status: 'draft' },
]

export function ProductsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage all your digital products and courses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary">
          <Plus className="w-5 h-5" />
          New Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Students</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product.id} className={`border-t border-border hover:bg-muted ${i === products.length - 1 ? '' : ''}`}>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{product.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{product.price}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{product.students.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">⭐ {product.rating}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-card rounded-lg">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-card rounded-lg">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-card rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
