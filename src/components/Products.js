import { Table, Row, Col, Container, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Products() {
    const [products, setProducts] = useState([]);
    // const [products2, setProducts2] = useState(data);
    const [categories, setCategories] = useState([]);
    const [catId, setCatId] = useState(0);
    const [search, setSearch] = useState("");
    let { categoryId } = useParams();
    // const handleSearch = (search) => {
    //     if (search != "") {
    //         const searchResult = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    //         setProducts(searchResult)
    //     }
    //     else {
    //         setProducts(products2);
    //     }
    // }

    // const handleSelect = (o) => {
    //     if (o == 0) {
    //         setProducts(data);
    //         setProducts2(data);
    //     }
    //     else {
    //         const testResult = data2.find(c => c.id == o);
    //         const selectResult = data.filter(p => p.catId == testResult.id)
    //         setProducts(selectResult);
    //         setProducts2(selectResult);
    //     }
    // }
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [catId, search])
    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:9999/categories");
        setCategories(response.data);
    }
    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:9999/products");
        let res = response.data;
        if (catId === 0) {
            res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        }
        else if (catId !== 0) {
            res = res.filter(p => p.catId === catId && p.name.toLowerCase().includes(search.toLowerCase()))
        }
        else if (typeof categoryId != "undefined") {
            res = res.filter(p => p.catId === categoryId && p.name.toLowerCase().includes(search.toLowerCase()))
        }
        setProducts(res);
    }
    // console.log(catId);
    console.log(categoryId);
    return (
        <Container>
            <Row style={{ paddingBottom: '10px' }}>
                <Col md={2}>
                    <Form>
                        <Form.Select id='form-select' onChange={(e) => setCatId(parseInt(e.target.value))}>
                            <option value={0}>All categories</option>
                            {categories.map((c, index) => (
                                <option key={index} value={c.id}>{c.name}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </Col>
                <Col md={7}>
                    <Form>
                        <Form.Group>
                            <Form.Control type='search' className="form-control me-2" placeholder='Enter product to search' onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <Link to='/product/create'>Create new product</Link>
                </Col>
            </Row>
            <Row>
                {
                    products.length === 0 ? (<h5>The products not have in the list</h5>) :
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Create Date</th>
                                    <th>Status</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((p, index) => (
                                        <tr key={index}>
                                            <td>{p?.id}</td>
                                            <td><Link to={`/product/${p?.id}`}>{p?.name}</Link></td>
                                            <td>{p?.price}</td>
                                            <td>{p?.quantity}</td>
                                            <td>{categories.map(c => {
                                                if (c?.id === p?.catId) {
                                                    return c.name
                                                }
                                            })}</td>
                                            <td>{p?.createAt}</td>
                                            <td>{p?.status ? "In stock" : "Out stock"}</td>
                                            <td><Link to={`/product/edit/${p?.id}`}>Edit</Link></td>
                                            <td><Link>Delete</Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                }

            </Row>
        </Container>
    )
}
export function Category({ data = [], data2 = [], test }) {
    return (
        <ul>
            {
                data2.map((c, index) => (
                    <li key={index}><Link to={`/product/category/${c.id}`}>{c.name}</Link></li>
                ))
            }
        </ul>
    )
}
