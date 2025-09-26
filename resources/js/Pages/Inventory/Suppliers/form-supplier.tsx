import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Suppiler } from "@/Types";
import FormField from "@/components/form-field";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextAriaField from "@/components/textaria-field";

type Props = {
    supplier?: Suppiler;
    method: "post" | "put";
    action: string;
};

function FormSuppliers({ supplier, method, action }: Props) {
    const form = useForm({
        name: supplier?.name || "",
        address: supplier?.address || "",
        phone: supplier?.phone || "",
        email: supplier?.email || "",
        description: supplier?.description || "",
        facebook: supplier?.facebook || "",
        instagram: supplier?.instagram || "",
        whatsapp: supplier?.whatsapp || "",
        website: supplier?.website || "",
        logo: supplier?.logo || (null as File | string | null),
    });

    const [clientErrors, setClientErrors] = useState<Record<string, string>>(
        {}
    );

    const validate = () => {
        const errors: Record<string, string> = {};

        if (!form.data.name.trim()) errors.name = "Name is required";

        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        router.post(
            action,
            {
                _method: method, // Laravel will treat this as PUT
                ...form.data, // all other fields
                logo: form.data.logo, // file if present
            },
            {
                forceFormData: true, // ensures multipart/form-data
                preserveScroll: true,
            }
        );
    };

    return (
        <form onSubmit={submit} className="mt-6 px-4 space-y-4 overflow-y-auto">
            {/* Name */}
            <FormField
                name="name"
                label="Name"
                placeholder="Doctor Name"
                value={form.data.name}
                error={clientErrors?.name || form.errors?.name}
                required
                onChange={(value) => {
                    form.setData("name", value);
                    setClientErrors((prev) => ({ ...prev, name: "" }));
                }}
            />
            <FormField
                name="email"
                label="Email"
                placeholder="Email "
                value={form.data.email}
                error={clientErrors?.email || form.errors?.email}
                onChange={(value) => {
                    form.setData("email", value);
                    setClientErrors((prev) => ({ ...prev, email: "" }));
                }}
            />
            <FormField
                name="phone"
                label="Phone number"
                placeholder="+213697096705"
                value={form.data.phone}
                error={clientErrors?.phone || form.errors?.phone}
                onChange={(value) => {
                    form.setData("phone", value);
                    setClientErrors((prev) => ({ ...prev, phone: "" }));
                }}
            />

            <FormField
                name="address"
                label="Address"
                placeholder="address "
                value={form.data.address}
                error={clientErrors?.address || form.errors?.address}
                onChange={(value) => {
                    form.setData("address", value);
                    setClientErrors((prev) => ({ ...prev, address: "" }));
                }}
            />

            <TextAriaField
                label="descrption"
                placeholder="descrption ."
                name="descrption"
                value={form.data.description}
                onChange={(value) => {
                    form.setData("description", value);
                }}
            />

            <FormField
                name="facebook"
                label="Facebook Url"
                placeholder="http://facebook.com/ "
                value={form.data.facebook}
                error={clientErrors?.facebook || form.errors?.facebook}
                onChange={(value) => {
                    form.setData("facebook", value);
                    setClientErrors((prev) => ({ ...prev, facebook: "" }));
                }}
            />
            <FormField
                name="instgrame"
                label="Instgrame Url"
                placeholder="http://instgrame.com/ "
                value={form.data.instagram}
                error={clientErrors?.instagram || form.errors?.instagram}
                onChange={(value) => {
                    form.setData("instagram", value);
                    setClientErrors((prev) => ({ ...prev, instgrame: "" }));
                }}
            />

            <FormField
                name="whatsapp"
                label="Whatsapp Url"
                placeholder="whatsapp "
                value={form.data.whatsapp}
                error={clientErrors?.whatsapp || form.errors?.whatsapp}
                onChange={(value) => {
                    form.setData("whatsapp", value);
                    setClientErrors((prev) => ({ ...prev, whatsapp: "" }));
                }}
            />

            <FormField
                name="website"
                label="Website Url"
                placeholder="website.com "
                value={form.data.website}
                error={clientErrors?.website || form.errors?.website}
                onChange={(value) => {
                    form.setData("website", value);
                    setClientErrors((prev) => ({ ...prev, website: "" }));
                }}
            />

            {/* Image Upload */}
            <div className="flex flex-col space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        form.setData("logo", e.target.files?.[0] || null)
                    }
                />
            </div>

            {/* Submit */}
            <Button
                type="submit"
                className="w-full cursor-pointer py-5"
                disabled={form.processing}
            >
                {form.processing ? "Saving..." : "Save Category"}
            </Button>
        </form>
    );
}

export default FormSuppliers;
