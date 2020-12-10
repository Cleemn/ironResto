import React from "react";

class AccordionItem extends React.Component {
  state = {
    opened: false,
    bg: ''
  };

  getStatus(status) {
    if (status === 'en_attente') {
      this.setState({bg: '#F9BFC0'});
    } else if (status === 'acceptee') {
      this.setState({bg: '#F6D6AD'});
    } else if (status === 'en_cours') {
      this.setState({bg: '#F9FCC2'});
    } else if (status === 'commande_prete') {
      this.setState({bg: '#DDF3F4'});
    } else {
      this.setState({bg: '#CBF6C8'});
    }
  }

  componentDidMount() {
    this.getStatus(this.props.status);
  }

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
          style={{backgroundColor: this.state.bg}}
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
          style={{backgroundColor: this.state.bg}}
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
        <div {...{ className: "accordion-item__inner" }} style={{backgroundColor: this.state.bg}}>
          <div {...{ className: "accordion-item__content container" }} style={{backgroundColor: this.state.bg}}>
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