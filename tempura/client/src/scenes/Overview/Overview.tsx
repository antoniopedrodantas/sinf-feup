import React from 'react';
import './styles/Overview.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Overview: React.FC = () => {
  return (
    <>

      <table className="table table-dark table-borderless table-sm">
      <thead>
        <tr className="table-header">
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
    </>
  );
};

export default Overview;
