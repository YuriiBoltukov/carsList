"use client";

import { Select } from "antd";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { label: "Без сортировки", value: "" },
  { label: "Цена ↑", value: "asc" },
  { label: "Цена ↓", value: "desc" },
];

export default function SortSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      options={options}
      onChange={onChange}
      className="min-w-[200px]"
    />
  );
}
