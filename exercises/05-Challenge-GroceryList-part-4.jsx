var React = require("react");

// Task: Ok, now the last exercise. You have to implement toggling
//       completeness of the each grocery list's item. Make each item reactive.
//
//       This is why we prepared the declaration of the `toggleGroceryCompleteness`
//       method in the `GroceryList` component.
//
//       WARNING: You should remember that we create a `grocery` item in the
//                `addGroceryItem` method. You need to add a `completed` field to
//                the `grocery` objects created there.
//
// === Tasks below aren't required for proceeding in Koans, but we encourage you to try ===
//
// Extra Task: As you can see in the `GroceryList` component - it has more than one
//             responsiblity. It displays groceries list, handles state
//             modification and handles the display and logic of new grocery
//             addition. The last of these responsibilities can be easily
//             extracted to another component. The new component should handle
//             only text input and the submit button.
//
//             Hint: You can pass a callback to the component's method
//                   (like `addGroceryItem`) as an attribute in the `render` method.
//
//             Warning: This task doesn't have its own tests, but current ones
//                      should be enough to cover it. The behaviour of whole
//                      app should not change.
//
// Extra Task: You can try to disable submit button for `newGrocery` if
//             `newGroceryName` state is empty. You can just use property
//             `disabled` for submit button component in `render` method.
//
//             Hint: There are no tests for this extra task. You need to do them
//                   yourself. You can perform manual-testing (meh.)
//                   Or try to create your own tests.
//                   Check out `test/05-Challange-GroceryList.js` for tests to this part.
//
// Extra Task: Extract creation (`addGroceryItem`) of grocery to external service.

class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [
        {
          name: "Apples",
          completed: false
        }
      ],
      newGroceryName: "",
      disabled: true
    };

    this.addGroceryItem = this.addGroceryItem.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.clearList = this.clearList.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  isDisabled() {
      console.log("Length of new grocery Name" + this.state.newGroceryName.length);
      return this.state.newGroceryName.length < 0;
  }

  inputChanged(event) {
    console.log(event.target.value + " with length of " + event.target.value.length);
    console.log("Disabled?" + this.state.disabled);
    this.setState({ newGroceryName: event.target.value });
    if(event.target.value.length > 0) {
      this.setState({disabled: false});
    } else {
      this.setState({disabled: true})
    }
  }

  addGroceryItem() {
    /* console.log(this.state.newGroceryName); */
    if(this.state.newGroceryName) {
      let newGroceryItem = {
        name: this.state.newGroceryName,
        completed: false
      };
      this.setState({
        groceries: this.state.groceries.concat([newGroceryItem])
      });
    }
  }

  clearList(event) {
    this.setState({groceries: []});
  }

  // Fill the definition of the following method to allow completing each item
  // Hint 1: Pay attention to the element's index on the list.
  toggleGroceryCompleteness(groceryIndex) {
    // Put your code here
      let orig = this.state.groceries[groceryIndex].completed;
      this.state.groceries[groceryIndex].completed = !orig;
      this.forceUpdate(); //hack?
  }

  render() {
    let groceriesComponents = [],
        clearListButton;
    for(var index = 0; index < this.state.groceries.length; index++) {
      groceriesComponents.push(
          <GroceryListItem
            grocery={this.state.groceries[index]}
            onComplete={this.toggleGroceryCompleteness.bind(this, index)}
          />
      );
    }


    clearListButton = <button className='clear-list' onClick={this.clearList}>Clear the List</button>;

    return (
      <div>
        <ul>
          {groceriesComponents}
        </ul>
        <ButtonAndInput addGroceryItem={this.addGroceryItem} inputChanged={this.inputChanged} disabled={this.state.disabled}/>
        {clearListButton}
      </div>
    );
  }
}


var ButtonAndInput = React.createClass ({

  render() {
    let newProductInput,
        newProductAddButton;

    newProductInput = <input className='new-item' type="text" onChange={this.props.inputChanged}/>;
    newProductAddButton = <button className='add-product' onClick={this.props.addGroceryItem}>Add new Product</button>;

    return (
        <div>
            <input className='new-item' type="text" onChange={this.props.inputChanged}/>
            <button className='add-product' disabled={this.props.disabled} onClick={this.props.addGroceryItem}>Add new Product</button>
        </div>
    );
  }
});

class GroceryListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let completed = this.props.grocery.completed ? "completed" : '';
    return (
      <li className={completed} onClick={this.props.onComplete}>
        {this.props.grocery.name}
      </li>
    );
  }
}

export default GroceryList;
