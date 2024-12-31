import React, { useContext, useState } from "react";
import InputNS from "../../../ui/Input/InputNS";
import { Options } from "../../../ui/Select/Select";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { AuthContext } from "../../../contexts/AuthContext";
import { TD } from "../../../ui/Table/Table";
import SelectNS from "../../../ui/Select/SelectNS";

const EntryExpense = ({ setCount }) => {
  const { explistId } = useParams();
  const { user } = useContext(AuthContext);
  const [formdata, setFormdata] = useState({
    date: "",
    category: "",
    source: "",
    amount: "",
  });

  const [errors, setErrors] = useState({
    source: "",
    amount: "",
    date: "",
    category: "",
  });
  const handleFieldChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });
  };

  const entryExpense = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/expenses`,
        { ...formdata, expenseList: explistId },
        { headers: { Authorization: user.token } }
      );
      if (result.data.success) setCount((prev) => prev + 1);
      setFormdata({
        date: "",
        category: "",
        source: "",
        amount: 0,
      });
      setCount((prev) => prev + 1);
    } catch (error) {
      setErrors(error?.response?.data?.errors || { message: error.message });
    }
  };

  return (
    <>
      <TD>
        <InputNS
          style={{ borderRadius: 0 }}
          type="text"
          name="source"
          id="source"
          value={formdata.source}
          onChange={(e) => {
            handleFieldChange("source", e.target.value);
          }}
          error={errors.source}
        />
      </TD>
      <TD>
        <SelectNS
          name="category"
          id="category"
          onChange={(e) => handleFieldChange("category", e.target.value)}
          value={formdata.category}
          error={errors.category}
        >
          <Options
            options={{
              Category: "",
              Food: "food",
              Travel: "travel",
              Personal: "personal",
              Family: "family",
            }}
          />
        </SelectNS>
      </TD>
      <TD>
        <InputNS
          type="date"
          name="date"
          id="date"
          value={formdata.date}
          onChange={(e) => {
            handleFieldChange("date", e.target.value);
          }}
          error={errors.date}
        />
      </TD>
      <TD>
        <InputNS
          type="number"
          name="amount"
          id="amount"
          value={formdata.amount}
          onChange={(e) => {
            handleFieldChange("amount", e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") entryExpense();
          }}
          error={errors.amount}
        />
      </TD>
    </>
  );
};

export default React.memo(EntryExpense);
