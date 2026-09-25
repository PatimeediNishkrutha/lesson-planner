import React from "react";

function RoleSelector({ role, onRoleChange }) {
  return (
    <select
      value={role}
      onChange={(event) => onRoleChange(event.target.value)}
      className="role-selector"
    >
      <option value="Teacher">Teacher</option>
      <option value="HOD">HOD</option>
      <option value="Principal">Principal</option>
      <option value="Admin">Admin</option>
    </select>
  );
}

export default RoleSelector;