<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-data-table v-if="desserts.length" :headers="headers" :items="desserts" :sort-by="[{ key: 'name', order: 'asc' }]"
		class="elevation-1" style="max-width: 600px">

		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Animals Crud</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ props }">
						<v-btn color="primary" dark class="mb-2" v-bind="props">
							New Item
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field v-model="editedItem.name" label="Animal name"></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue-darken-1" variant="text" @click="close">
								Cancel
							</v-btn>
							<v-btn color="blue-darken-1" variant="text" @click="save">
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
							<v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item="{ item }">
			<tr :class="item.value.selected ? 'active-row' : ''">
				<td>{{ item.value.name }}</td>
				<td class="text-right">
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil
					</v-icon>
					<v-icon small @click="deleteItem(item)">
						mdi-delete
					</v-icon>
				</td>
			</tr>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">
				Reset
			</v-btn>
		</template>
	</v-data-table>
	<v-overlay v-if="loading" :model-value="loading" class="align-center justify-center">
		<v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
	</v-overlay>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { VDataTable } from 'vuetify/labs/VDataTable'


const dialog = ref(false)
const dialogDelete = ref(false)

const headers = ref<any[]>([
	{
		title: 'Animal Name',
		align: 'start',
		key: 'name',
	},
	{ title: 'Actions', align: 'end', key: 'actions', sortable: false },
])
const desserts = ref<any[]>([])

const loading = computed(() => desserts.value.length === 0)

const editedIndex = ref(-1)
const editedItem = ref({
	name: '',
	selected: false,

})
const defaultItem = ref({
	name: '',
	selected: false,
})

const formTitle = computed(() => editedIndex.value === -1 ? 'New Item' : 'Edit Item')

const initialize = () => {
	setTimeout(() => {
		desserts.value = [
			{
				name: 'Frozen Yogurt',
				selected: true
			},
			{
				name: 'Ice cream sandwich',
				selected: false
			},
			{
				name: 'Eclair',
				selected: false
			},
			{
				name: 'Cupcake',
				selected: false
			},
			{
				name: 'Gingerbread',
				selected: false
			},
			{
				name: 'Jelly bean',
				selected: false
			},
			{
				name: 'Lollipop',
				selected: false
			},
			{
				name: 'Honeycomb',
				selected: false

			},
			{
				name: 'Donut',
				selected: false

			},
			{
				name: 'KitKat',
				selected: false
			},
		]
	}, 1500);
}
initialize()

const editItem = (item: any) => {
	console.log(item.value)
	editedIndex.value = desserts.value.indexOf(item)
	editedItem.value = Object.assign({}, item)
	dialog.value = true
}

const deleteItem = (item: any) => {
	editedIndex.value = desserts.value.indexOf(item)
	editedItem.value = Object.assign({}, item)
	dialogDelete.value = true
}

const deleteItemConfirm = () => {
	desserts.value.splice(editedIndex.value, 1)
	closeDelete()
}

const close = () => {
	dialog.value = false
	setTimeout(() => {
		editedItem.value = Object.assign({}, defaultItem.value)
		editedIndex.value = -1
	}, 300)
}

const closeDelete = () => {
	dialogDelete.value = false
	setTimeout(() => {
		editedItem.value = Object.assign({}, defaultItem.value)
		editedIndex.value = -1
	}, 300)
}

const save = () => {
	if (editedIndex.value > -1) {
		Object.assign(desserts.value[editedIndex.value], editedItem.value)
	} else {
		desserts.value.push(editedItem.value)
	}
	close()
}

</script>

<style>
.v-application .v-theme--dark tr,
.v-application .v-theme--dark tr td {
	cursor: pointer;
}

.v-application .v-theme--dark tr.active-row,
.v-application .v-theme--dark tr.active-row td {
	background: rgb(var(--v-theme-secondary)) !important;
}

.v-application .v-theme--dark tr:hover,
.v-application .v-theme--dark tr td:hover {
	color: #fff;
}
</style>