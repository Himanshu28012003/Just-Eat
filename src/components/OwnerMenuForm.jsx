import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

const initialForm = {
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
};

const OwnerMenuForm = ({
    menuItem,
    onSubmit,
    onCancel,
    saving,
}) => {

    const [form, setForm] =
        useState(initialForm);


    useEffect(() => {

        if (menuItem) {

            setForm({
                name: menuItem.name || "",
                description:
                    menuItem.description || "",
                price:
                    menuItem.price ?? "",
                category:
                    menuItem.category || "",
                imageUrl:
                    menuItem.imageUrl || "",
            });

        } else {

            setForm(initialForm);

        }

    }, [menuItem]);


    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            ...form,
            price: Number(form.price),
        });
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-6 shadow-sm"
        >

            <div className="mb-7 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        {menuItem
                            ? "Edit Menu Item"
                            : "Add Menu Item"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {menuItem
                            ? "Update this menu item."
                            : "Add a new item to your menu."}
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                >
                    <X size={20} />
                </button>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Item Name
                    </label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Category
                    </label>

                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        placeholder="Pizza, Biryani, Dessert..."
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Image URL
                    </label>

                    <input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />

                </div>

            </div>


            <div className="mt-7 flex justify-end gap-3">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border px-5 py-3 font-medium text-gray-600"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                >

                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : menuItem
                            ? "Update Item"
                            : "Add Item"}

                </button>

            </div>

        </form>
    );
};

export default OwnerMenuForm;