import { useEffect, useState } from "react";

import { getOwnerNames } from "../api/getOwnerNames";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import Spinner from "../../../shared/components/states/Spinner";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

const categories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Shopping" },
  { id: 4, name: "Health" },
  { id: 5, name: "Entertainment" },
  { id: 6, name: "Other" },
];

function ExpenseForm({
  onSubmit,
  initialData = {},
  buttonText = "Create Expense",
  loading = false,
  loadingText = "Saving..."
}){

  const [formData, setFormData] = useState({

  amount:
    initialData.amount || "",

  date:
    initialData.date || "",

  categoryId:
    initialData.categoryId || "",

  ownerType:
    initialData.ownerType || "SELF",

  ownerName:
    initialData.ownerName || "",

  description:
    initialData.description || "",
});

  const [ownerNames, setOwnerNames] = useState([]);

  const [loadingOwners, setLoadingOwners] =
    useState(false);

  const toast =
    useToast();

  useEffect(() => {

    if (formData.ownerType !== "OTHER") {

      return;
    }

    async function fetchOwnerNames() {

      try {

        setLoadingOwners(true);

        const data =
          await getOwnerNames();

        setOwnerNames(data);

      } catch (error) {

        console.error(error);

        setOwnerNames([]);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        toast.error(
          getFriendlyErrorMessage(
            error,
            "Failed to load owner names"
          )
        );

      } finally {

        setLoadingOwners(false);
      }
    }

    fetchOwnerNames();

  }, [formData.ownerType, toast]);

  function handleChange(event) {

    const { name, value } = event.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

      ...(name === "ownerType"
        ? { ownerName: "" }
        : {})
    }));
  }

  async function handleSubmit(event) {

    event.preventDefault();

    if (loading) {
      return;
    }

    const finalData = {

      ...formData,

      ownerName:

        formData.ownerType === "SELF"
          ? "jack"
          : formData.ownerName
    };

    await onSubmit(finalData);
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        p-8
        rounded-3xl
        shadow-sm
        border border-gray-100
        space-y-6
      "
    >

      {/* Amount */}

      <div>

        <label
          className="
            block
            mb-2
            text-sm
            font-medium
          "
        >
          Amount
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter amount"
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-green-500
            disabled:cursor-not-allowed
            disabled:bg-gray-50
          "
          required
        />

      </div>

      {/* Date */}

      <div>

        <label
          className="
            block
            mb-2
            text-sm
            font-medium
          "
        >
          Date
        </label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          disabled={loading}
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-green-500
            disabled:cursor-not-allowed
            disabled:bg-gray-50
          "
          required
        />

      </div>

      {/* Category */}

      <div>

        <label
          className="
            block
            mb-2
            text-sm
            font-medium
          "
        >
          Category
        </label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          disabled={loading}
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-green-500
            disabled:cursor-not-allowed
            disabled:bg-gray-50
          "
          required
        >

          <option value="">
            Select Category
          </option>

          {categories.map((category) => (

            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>

          ))}

        </select>

      </div>

      {/* Owner Type */}

      <div>

        <label
          className="
            block
            mb-2
            text-sm
            font-medium
          "
        >
          Owner Type
        </label>

        <select
          name="ownerType"
          value={formData.ownerType}
          onChange={handleChange}
          disabled={loading}
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-green-500
            disabled:cursor-not-allowed
            disabled:bg-gray-50
          "
          required
        >

          <option value="SELF">
            SELF
          </option>

          <option value="OTHER">
            OTHER
          </option>

        </select>

      </div>

      {/* Owner Name Dropdown */}

      {
        formData.ownerType === "OTHER" && (

          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-medium
              "
            >
              Owner Name
            </label>

            <select
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              disabled={loadingOwners || loading}
              className="
                w-full
                border border-gray-200
                rounded-xl
                px-4 py-3
                outline-none
                focus:border-green-500
                disabled:bg-gray-50
                disabled:cursor-not-allowed
              "
              required
            >

              <option value="">

                {
                  loadingOwners
                    ? "Loading owners..."
                    : "Select Owner"
                }

              </option>

              {ownerNames.map((name) => (

                <option
                  key={name}
                  value={name}
                >
                  {name}
                </option>

              ))}

            </select>

          </div>
        )
      }

      {/* Description */}

      <div>

        <label
          className="
            block
            mb-2
            text-sm
            font-medium
          "
        >
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          placeholder="Expense description"
          rows="4"
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-green-500
            disabled:cursor-not-allowed
            disabled:bg-gray-50
          "
          required
        />

      </div>

      {/* Submit Button */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-green-600
          hover:bg-green-700
          text-white
          py-3
          rounded-xl
          transition
          font-medium
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Spinner />
            {loadingText}
          </span>
        ) : (
          buttonText
        )}
      </button>

    </form>
  );
}

export default ExpenseForm;
