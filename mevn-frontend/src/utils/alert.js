import Swal from "sweetalert2";

export const successAlert = (msg = "Operation successful!") => {
    Swal.fire("Success", msg, "success");
};

export const errorAlert = (msg = "Something went wrong!") => {
    Swal.fire("Error", msg, "error");
};

export const confirmAlert = async (text = "Are you sure?") => {
    return await Swal.fire({
        title: "Confirm",
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    });
};
