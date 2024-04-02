import moment from "moment";

import { formatFileSize } from "../../functions/CustomFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFileDownload } from "@fortawesome/free-solid-svg-icons"; // Import ไอคอนต่างๆ
import API from "../../API/axiosInstance";

const ExpandedFile = ({ data }) => (
  <div className="card mb-3">
    <div className="row g-0">
      <div className="col-md-8">
        <div className="card-body text">
          <h5 className="card-title">{data.filename}</h5>
          <p className="card-text">
            ( Size: {data.size ? formatFileSize(data.size) : "Unknown"} )
          </p>
          <p className="card-text">
            อัพโหลดโดย:{" "}
            <small className="text-body-secondary">
              {data.user.username},({data.user.fname} {data.user.lname}) ({" "}
              {data.user.role}, {data.user.rank} )
            </small>
          </p>

          <p className="card-text">
            อัพโหลดเมื่อ{" "}
            <small className="text-body-secondary">
              {moment(data.createdAt).format(" DD/MM/YYYY  HH:mm:ss ")}
            </small>
          </p>

          <p className="card-text">
            <a
              href={`${API.defaults.baseURL}/${data.path}`}
              className="btn btn-primary mt-2"
              download
              target="blank"
            >
              {" "}
              <FontAwesomeIcon icon={faFileDownload} className="me-2" />{" "}
              Download File
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ExpandedFile;
