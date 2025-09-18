export interface Product {
  id: string; name: string; price: number; originalPrice?: number; image: string
  category: string; description: string; rating: number; reviews: number
  inStock: boolean; isNew?: boolean; isSale?: boolean
}
export const categories = ['All','Electronics','Clothing','Home & Garden','Sports','Books','Beauty','Toys']
export const products: Product[] = [
  {id:'1',name:'Wireless Headphones Pro',price:299,originalPrice:399,image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',category:'Electronics',description:'Premium noise-cancelling wireless headphones.',rating:4.8,reviews:234,inStock:true,isNew:true,isSale:true},
  {id:'2',name:'Smart Watch Ultra',price:449,image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',category:'Electronics',description:'Advanced fitness tracking smartwatch.',rating:4.6,reviews:189,inStock:true,isNew:true},
  {id:'3',name:'Organic Cotton T-Shirt',price:39,originalPrice:59,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',category:'Clothing',description:'Sustainable organic cotton t-shirt.',rating:4.4,reviews:156,inStock:true,isSale:true},
  {id:'4',name:'Ergonomic Office Chair',price:599,image:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',category:'Home & Garden',description:'Premium ergonomic office chair.',rating:4.7,reviews:98,inStock:true},
  {id:'5',name:'Yoga Mat Premium',price:79,originalPrice:99,image:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',category:'Sports',description:'Non-slip premium yoga mat.',rating:4.5,reviews:267,inStock:true,isSale:true},
  {id:'6',name:'Coffee Maker Deluxe',price:249,image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',category:'Home & Garden',description:'Programmable coffee maker.',rating:4.3,reviews:145,inStock:true},
  {id:'7',name:'Running Shoes Pro',price:189,originalPrice:229,image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',category:'Sports',description:'Professional running shoes.',rating:4.6,reviews:312,inStock:true,isNew:true,isSale:true},
  {id:'8',name:'Skincare Set',price:129,image:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',category:'Beauty',description:'Complete skincare set.',rating:4.4,reviews:89,inStock:true},
]
