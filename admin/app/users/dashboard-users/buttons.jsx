"use server";
export const actionButtons = (row) => {
  return (
    <>
      <button className="edit-button">Edit</button>
      <button className="delete-button">Delete</button>
    </>
  );
};
