const { createApp } = Vue

createApp({
    data() {
        return {
            message: 'Instruments',
            urlApi: "http://localhost:8000/api",
            rows: [],  // Termékek tárolása
            isFormVisible: false,  // Az input mezők láthatóságát szabályozó változó
            isUpdateVisible: false, // Az update form láthatóságát szabályozó változó
            isDeleteVisible: false, // A delete form láthatóságát szabályozó változó
            newProduct: { // Beviteli mezők modellje
                name: '',
                description: '',
                brand: '',
                price: '',
                quantity: '' // Stock helyett Quantity
            },
            updateProduct: { // Frissítő form adatmodellje
                id: null,
                name: '',
                description: '',
                brand: '',
                price: '',
                quantity: ''
            },
            deleteProductId: null, // A törlendő termék ID-ja
            selectedProductId: null // A frissíteni kívánt termék ID-ja
        }
    },
    methods: {
        // GET művelet a termékek lekérésére
        async getInstruments() {
            const url = `${this.urlApi}/instruments`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                console.log("API válasz:", result);
                this.rows = [...result.data];  // A kapott adatokat eltároljuk
            } catch (error) {
                console.error("API hiba:", error.message);
            }
        },

        // POST művelet új termék hozzáadására
        async postInstruments(data) {
            const url = `${this.urlApi}/instruments`;
            const method = "POST";
            const body = JSON.stringify(data);
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: body
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);
                this.getInstruments();  // Frissítjük a listát
                this.newProduct = { name: '', description: '', brand: '', price: '', quantity: '' }; // Reseteljük a formot
            } catch (error) {
                console.error(error.message);
            }
        },

        // PUT művelet a meglévő termék frissítésére
        async updateInstruments(id, updatedData) {
            const url = `${this.urlApi}/instruments/${id}`;
            const method = "PUT";
            const body = JSON.stringify(updatedData);
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: body
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);
                this.getInstruments();  // Frissítjük a listát
                this.isUpdateVisible = false;  // Elrejtjük az update formot
            } catch (error) {
                console.error(error.message);
            }
        },

        // DELETE művelet a termék törlésére
        async deleteInstruments(id) {
            const url = `${this.urlApi}/instruments/${id}`;
            const method = "DELETE";
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);
                this.getInstruments();  // Frissítjük a listát
                this.isDeleteVisible = false;  // Elrejtjük a delete formot
            } catch (error) {
                console.error(error.message);
            }
        },

        // GET gomb kattintáskor
        onClickButtonHangszerek() {
            this.getInstruments();
        },

        // POST gomb kattintáskor
        onClickButtonPost() {
            this.postInstruments(this.newProduct);
        },

        // PUT gomb kattintáskor
        onClickButtonUpdate() {
            // Az ID alapján frissítjük a terméket
            this.updateInstruments(this.updateProduct.id, this.updateProduct);
        },

        // DELETE gomb kattintáskor
        onClickButtonDelete() {
            this.deleteInstruments(this.deleteProductId);
        },

        // Toggle a form láthatósága
        toggleForm() {
            this.isFormVisible = !this.isFormVisible;
        },

        // Toggle az update form láthatósága
        toggleUpdateForm() {
            this.isUpdateVisible = !this.isUpdateVisible;
        },

        // Toggle a delete form láthatósága
        toggleDeleteForm() {
            this.isDeleteVisible = !this.isDeleteVisible;
        },

        // Termékadatok betöltése ID alapján az UPDATE formhoz
        async fetchProductData() {
            if (!this.updateProduct.id) return;

            const url = `${this.urlApi}/instruments/${this.updateProduct.id}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const productData = await response.json();
                // A termékadatokat betöltjük a formba
                this.updateProduct = { ...productData }; // Ezt a terméket frissítjük
            } catch (error) {
                console.error("API hiba:", error.message);
            }
        }
    }
}).mount('#app');
