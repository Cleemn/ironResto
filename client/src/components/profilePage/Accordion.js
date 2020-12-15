import React from "react";

class AccordionItem extends React.Component {
  state = {
    opened: false
  };

  render() {
    const {
      state: { opened },
    } = this;
    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
        }}
      >
        <div
          {...{
            className: "accordion-item__line container",
          }}
        >
          <h6 {...{ 
            className: "accordion-item__title", 
            onClick: () => {
              this.props.history.push(`/orders/${this.props.orderId}`)
          },
            }}>{this.props.date}</h6>
          <h6 {...{ className: "accordion-item__price" }}>
            {this.props.price}
          </h6>
        </div>
        <div
          {...{
            className: "accordion-item__line container",
          }}
        >
          <div>
            {this.props.items.length === 1 ? (<p>{this.props.items.length} item</p>) : (<p>{this.props.items.length} items</p>)}
          </div>
          <span
            {...{
              className: "accordion-item__icon",
              onClick: () => {
                this.setState({ opened: !opened });
              },
            }}
          />
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          <div {...{ className: "accordion-item__content container" }}>
            {this.props.items.map((item, i) => {
              const product = item.product_id;
              return (
                <div key={i} {...{ className: "accordion-item__product" }}>
                  <img src={`${product.photo}`} alt=""></img>
                  <p>{item.quantity}</p>
                  <p>{product.name}</p>
                  <p className="price">{product.price}€</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AccordionItem;