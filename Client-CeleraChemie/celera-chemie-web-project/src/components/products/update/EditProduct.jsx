import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Input from "../../common/Input";
import { createProductValidationFunc } from "../../../utils/formValidator";
import createProductValidator from "../../../utils/createProductValidator";
import "../../user/Form.css";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manufacturer: "",
      description: "",
      category: "",
      logoUrl: "",
      language: "",
      catalogueUrl: "",
      brandWebSite: ""
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    fetch(`http://localhost:5000/product/${productId}`)
      .then(rawData => rawData.json())
      .then(product =>
        this.setState({
          manufacturer: product.manufacturer,
          description: product.description,
          category: product.category,
          logoUrl: product.logoUrl,
          language: product.language,
          catalogueUrl: product.catalogueUrl,
          brandWebSite: product.brandWebSite
        })
      );
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/login" />;
    }

    let validObj = createProductValidationFunc(
      this.state.manufacturer,
      this.state.description,
      this.state.category,
      this.state.logoUrl,
      this.state.language,
      this.state.catalogueUrl,
      this.state.brandWebSite
    );
    return (
      <div className="Form">
        <h1>Edit Product</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="manufacturer"
            label="Manufacturer"
            placeholder={this.state.manufacturer}
            value={this.state.manufacturer}
            onChange={this.onChange}
            valid={validObj.validManufacturer}
          />
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            placeholder={this.state.description}
            value={this.state.description}
            onChange={this.onChange}
          />
          <Input
            type="text"
            name="category"
            label="Category"
            placeholder={this.state.category}
            value={this.state.category}
            onChange={this.onChange}
            valid={validObj.validCategory}
          />
          <Input
            type="text"
            name="language"
            label="Language"
            placeholder={this.state.language}
            value={this.state.language}
            onChange={this.onChange}
            valid={validObj.validLanguage}
          />
          <Input
            type="text"
            name="logoUrl"
            label="Logo URL"
            placeholder={this.state.logoUrl}
            value={this.state.logoUrl}
            onChange={this.onChange}
            valid={validObj.validLogoUrl}
          />
          <Input
            type="text"
            name="catalogueUrl"
            label="Catalogue URL"
            placeholder={this.state.catalogueUrl}
            value={this.state.catalogueUrl}
            onChange={this.onChange}
            valid={validObj.validCatalogueUrl}
          />
          <Input
            type="text"
            name="brandWebSite"
            label="Manufacturer web site"
            placeholder={this.state.brandWebSite}
            value={this.state.brandWebSite}
            onChange={this.onChange}
            valid={validObj.validBrandUrl}
          />
          <input type="submit" value="Edit Product" />
        </form>
      </div>
    );
  }
}

export default EditProduct;