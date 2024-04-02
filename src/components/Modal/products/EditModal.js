import { Button } from "react-bootstrap";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import API from "../../../API/axiosInstance";

const EditProductModal = ({
  show,
  handleClose,
  handleSubmit,
  handleEditFileChange,
  editedData,
  selectedFile,
  setEditedData,
  setModalOpenEdit,
}) => {
  return (
    <>
      <MDBModal
        open={show}
        onClose={() => setModalOpenEdit(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Product</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                defaultValue={editedData.price}
                onChange={(e) =>
                  setEditedData({ ...editedData, price: e.target.value })
                }
              />
              <label>Description:</label>
              <textarea
                type="text"
                className="form-control"
                as="textarea"
                aria-label="With textarea"
                rows="4"
                cols="50"
                defaultValue={editedData.description}
                onChange={(e) =>
                  setEditedData({ ...editedData, description: e.target.value })
                }
              />
              <label>Image:</label>
              <input
                type="file"
                className="form-control"
                onChange={handleEditFileChange}
              />
              <img
                className="mt-2 img-preview img-thumbnail img-fluid"
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : `${API.defaults.baseURL}/${editedData.imageUrl}`
                }
                alt=""
              />
            </MDBModalBody>
            <MDBModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleSubmit}>Save changes</Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>

    // <Modal show={show} onHide={handleClose} style={{ overflowY: "auto" }}>
    //   <form onSubmit={handleSubmit}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Edit Product </Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body style={{ overflowY: "auto" }}>
    //       <label>Name:</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         defaultValue={editedData.name}
    //         onChange={(e) =>
    //           setEditedData({ ...editedData, name: e.target.value })
    //         }
    //       />
    //       <label>Price:</label>
    //       <input
    //         type="number"
    //         className="form-control"
    //         defaultValue={editedData.price}
    //         onChange={(e) =>
    //           setEditedData({ ...editedData, price: e.target.value })
    //         }
    //       />
    //       <label>Description:</label>
    //       <textarea
    //         type="text"
    //         className="form-control"
    //         as="textarea"
    //         aria-label="With textarea"
    //         rows="6" cols="50"
    //         defaultValue={editedData.description}
    //         onChange={(e) =>
    //           setEditedData({ ...editedData, description: e.target.value })
    //         }
    //       />
    //       <label>Image:</label>
    //       <input
    //         type="file"
    //         className="form-control"
    //         onChange={handleEditFileChange}
    //       />
    //       <img
    //         className="mt-2 img-preview"
    //         src={
    //           selectedFile
    //             ? URL.createObjectURL(selectedFile)
    //             : `http://localhost:5000/${editedData.imageUrl}`
    //         }
    //         alt=""

    //       />
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //       <Button type="submit" variant="primary">
    //         Save Changes
    //       </Button>
    //     </Modal.Footer>
    //   </form>
    // </Modal>
  );
};

export default EditProductModal;
