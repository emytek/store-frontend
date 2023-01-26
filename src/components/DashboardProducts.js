import React, { useEffect } from "react";
import axios from "../axios";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
// import Pagination from "./Pagination";

function DashboardProducts() { 
    const { id } = useParams();
    const products = useSelector((state) => state.products);
    console.log(products)
    const user = useSelector((state) => state.user);

    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            console.log(products)
        });
    }, [id]);

    // removing the product
    const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
    function handleDeleteProduct(id) {
        // logic here
        if (window.confirm("Are you sure?")) deletProduct({ product_id: id, user_id: user._id });
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {/* <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} /> */}
                {products.map((product) => (
                    <tr>
                        <td>
                          <img src={product.pictures[0].url} className="dashboard-product-preview" />
                        </td>
                        <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                        <td>
                         <Button onClick={() => handleDeleteProduct(product._id, user._id)} disabled={isLoading} className="btn btn-danger">
                            Delete  
                         </Button>
                         <Link to={`/product/${product._id}/edit`} className="btn btn-warning">
                             Edit
                        </Link>
                      </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

}

export default DashboardProducts;
