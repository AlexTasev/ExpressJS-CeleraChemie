import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Redirect } from "react-router-dom";
import Auth from "../../../utils/auth";
import "./Products.css";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      isProductDeleted: false
    };

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteConfirmation = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to permanently delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteProduct()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  deleteProduct() {
    const productId = this.props.id;
    if (this.props.isAdmin) {
      fetch(`http://localhost:5000/product/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + Auth.getToken()
        }
      }).then(res => {
        this.setState({
          isProductDeleted: true
        });
        toast.success("Product deleted successfuly");
      });
    }
  }

  render() {
    if (this.state.isProductDeleted) {
      return <Redirect to="/products" />;
    }

    return (
      <div className="products-display">
        <div className="brand-logo-url">
          <img src={this.props.logoUrl} alt="logo" />
        </div>
        <div className="manufacturer">{this.props.manufacturer}</div>
        <div className="description">
          {this.props.description.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="btn-div">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.catalogueUrl}
            className="button-user"
          >
            Download Catalogue
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.brandWebSite}
            className="button-user"
          >
            Visit Official Website
          </a>
          {this.props.isAdmin && (
            <Fragment>
              <Link
                className="button-user"
                id="edit-btn"
                to={`/product/edit/${this.props.id}`}
              >
                Edit Product
              </Link>
              <button
                onClick={this.deleteConfirmation}
                className="button-user"
                id="delete-btn"
              >
                Delete Product
              </button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Product;
