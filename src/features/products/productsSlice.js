import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// ✅ Get all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data } = await apiClient.get("/products");
  return data;
});

// ✅ Get product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  }
);

// ✅ Create product (Admin only)
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await apiClient.post("/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating product");
    }
  }
);

// ✅ Update product (Admin only)
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await apiClient.put(`/products/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating product");
    }
  }
);

// ✅ Delete product (Admin only)
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await apiClient.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // بنرجع الـ id عشان نقدر نمسحه من الـ state
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting product");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], selected: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Fetch by ID
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // 📌 Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // 📌 Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.list.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      })

      // 📌 Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
