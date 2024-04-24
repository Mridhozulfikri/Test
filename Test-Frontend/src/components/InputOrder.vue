<template>
  <v-card>
    <v-card-item>
      <v-card-title>Buat Pesanan</v-card-title>
    </v-card-item>
    <v-card-text class="bg-surface-light pt-4">
      <v-row>
        <v-col cols="12" lg="4">
          <p class="text-body-2">Pilih Customer</p>
          <v-autocomplete
            v-model="selectedCustomer"
            variant="solo-filled"
            density="compact"
            label="Customer"
            :items="customers"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" lg="11">
          <p class="text-body-2">Pilih Product</p>
          <v-autocomplete
            v-model="selectedProduct"
            :items="product"
            item-title="name"
            item-value="id"
            variant="solo-filled"
            density="compact"
            label="Product"
            persistent-hint
            return-object
            single-line
          ></v-autocomplete>
        </v-col>
        <v-col cols="4" lg="1">
          <v-btn
            class="mt-6"
            variant="outlined"
            color="primary"
            @click="addItemToList"
            >Tambah
          </v-btn>
        </v-col>
        <v-col cols="12" lg="12">
          <v-card variant="outlined" color="success">
            <v-card-text>
              <div style="width: 100%">
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th class="text-left">Product</th>
                      <th class="text-left">Prize</th>
                      <th class="text-left" style="min-width: 100px">
                        Quantity
                      </th>
                      <th class="text-left" style="min-width: 150px">
                        Discount
                      </th>
                      <th class="text-left">Total</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in orderSummary.productList"
                      :key="index"
                    >
                      <td>{{ item.product_name }}</td>
                      <td>
                        {{
                          item.prize.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        }}
                      </td>
                      <td class="pt-4">
                        <v-text-field
                          variant="solo-filled"
                          density="compact"
                          type="number"
                          v-model="item.qty"
                          @input="updateItemTotal(item)"
                        ></v-text-field>
                      </td>
                      <td class="pt-4">
                        <v-text-field
                          v-model="item.discount"
                          variant="solo-filled"
                          density="compact"
                          type="number"
                          @input="updateItemTotal(item)"
                        >
                          %</v-text-field
                        >
                      </td>
                      <td>
                        {{
                          item.total.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        }}
                      </td>
                      <td>
                        <v-icon @click="removeItem(index)">mdi-close</v-icon>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>

              <p class="mt-2">Diskon Tambahan :</p>
              <v-text-field
                class="w-25"
                v-model="moreDiscount"
                variant="solo-filled"
                density="compact"
                type="number"
              >
                %</v-text-field
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card  variant="outlined" color="success">
            <v-card-item>
              <v-card-title>Metode Pembayaran</v-card-title>

              <v-autocomplete
                v-model="selectedPayment"
                :items="payment"
                item-title="name"
                item-value="id"
                variant="solo-filled"
                density="compact"
                label="Pilih Metode Pembayaran"
                persistent-hint
                return-object
                single-line
              ></v-autocomplete>
            </v-card-item>
            <v-card-text>
              <v-row>
                <v-col v-if="selectedPayment === null" cols="12">
                  <p>Silahkan Pilih Metode Pembayaran</p>
                </v-col>
                <v-col
                  v-else-if="selectedPayment.name === 'Transfer'"
                  cols="12"
                >
                  <p>Silahkan Unggah Bukti Pembayaran</p>
                  <v-file-input
                    clearable
                    variant="solo-filled"
                    density="compact"
                    label="File input"
                  ></v-file-input>
                </v-col>
                <v-col
                  v-else-if="selectedPayment.name === 'Shopeepay'"
                  cols="12"
                >
                  <p>Silahkan masukan nomor dibawah ini</p>
                  <v-text-field
                    label="Code"
                    variant="solo-filled"
                    density="compact"
                  ></v-text-field>
                </v-col>

                <v-col
                  v-else-if="selectedPayment.name === 'Credit Card/Debit Card'"
                  cols="12"
                >
                  <p>Silahkan Lengkapi Informasi Kartu Kredit</p>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nama Pemilik Kartu"
                        variant="solo-filled"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Nomor Kartu"
                        variant="solo-filled"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Expiry Date"
                        variant="solo-filled"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="CVC/CVV"
                        variant="solo-filled"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col v-else-if="selectedPayment.name === 'Go-Pay'" cols="12">
                  <p>Silahkan masukan nomor dibawah ini</p>
                  <v-text-field
                    label="Code"
                    variant="solo-filled"
                    density="compact"
                  ></v-text-field>
                </v-col>

                <v-col
                  v-else-if="selectedPayment.name === 'Virtual Account'"
                  cols="12"
                >
                  <p>Silahkan masukan nomor dibawah ini</p>
                  <v-text-field
                    label="1239715378123781"
                    variant="solo-filled"
                    density="compact"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card title="Summary Order"  variant="tonal" color="success">
            <v-card-item>
              <v-card-text>
                <v-row>
                  Total : <v-spacer />
                  {{
                    totalPrize.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}</v-row
                >

                <v-row>
                  Dipotong Diskon : <v-spacer />
                  {{
                    afterDiscount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}
                </v-row>
                <v-row>
                  Dipotong Diskon Lainnya ({{ moreDiscount }}%) : <v-spacer />
                  {{
                    finalPrize.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}</v-row
                >
              </v-card-text>
              <v-divider :thickness="2"></v-divider>
            </v-card-item>
            <v-card-item>
              <v-card-text>
                <v-row>
                  Order Total : <v-spacer />{{
                    finalPrize.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}</v-row
                >
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import masterCustomer from "../fakeData/MasterCustomer.json";
import masterBarang from "../fakeData/MasterBarang.json";
import masterPayment from "../fakeData/MasterPayment.json";
export default {
  data() {
    return {
      moreDiscount: 0,
      selectedCustomer: null,
      selectedProduct: null,
      selectedPayment: null,
      //
      customers: masterCustomer.data.map((customer) => customer.customer_name),
      payment: masterPayment,
      product: masterBarang,
      //
      orderSummary: {
        customerName: "",
        paymentMethod: "",
        grandTotalPayment: 0,
        total: 0,
        productList: [],
      },
    };
  },
  methods: {
    addItemToList() {
      if (this.selectedProduct) {
        const newItem = {
          product_name: this.selectedProduct.name,
          qty: 1,
          prize: this.selectedProduct.price,
          discount: 0,
          total: this.selectedProduct.price,
        };
        this.orderSummary.productList.push(newItem);

        this.selectedProduct = null;
      }
    },
    removeItem(index) {
      this.orderSummary.productList.splice(index, 1);
      this.updateTotal();
    },
    updateTotal() {
      let total = 0;
      this.orderSummary.productList.forEach((item) => {
        item.total = item.qty * item.prize * (1 - item.discount / 100);
        total += item.total; 
      });
    
      this.orderSummary.total = total;
    },
    updateItemTotal(item) {
      if (item.qty < 1) {
        item.qty = 1;
      }

      if (item.discount < 0) {
        item.discount = 0;
      } else if (item.discount > 100) {
        item.discount = 100;
      }
  
      item.total = item.qty * item.prize * (1 - item.discount / 100);
      this.updateTotal(); 
    },
  },
  computed: {
    totalPrize() {
      return this.orderSummary.productList.reduce((total, item) => {
        this.updateTotal();
        return total + item.prize * parseInt(item.qty);
      }, 0);
    },

    afterDiscount() {
      return this.orderSummary.productList.reduce((total, item) => {
        this.updateTotal();
        return total + item.total;
      }, 0);
    },
    finalPrize() {
      return this.orderSummary.total * (1 - this.moreDiscount / 100);
    },
  },
};
</script>
