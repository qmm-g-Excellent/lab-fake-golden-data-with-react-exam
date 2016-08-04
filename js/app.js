const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toggle: function () {
        this.setState({isEditor: !this.state.isEditor});
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({element});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <button onClick={this.toggle}>{isEditor ? "Preview" : "Editor"}</button>

            <div className={isEditor ? "" : "hidden"}>
                <Editor elements={this.state.elements}
                        onAdd={this.addElement}
                        onDelete={this.elements}/>
            </div>

            <div className={isEditor ? "hidden" : ""}>
                <Previewer  elements={this.elements}/>
            </div>

        </div>
    }
})


const Editor = React.createClass({

    render: function () {
        return <div>
            <Right onAdd={this.props.onAdd}/>
            <Left elements={this.props.elements} onDelete={this.deleteElement}/>
        </div>
    }
})


const Previewer = React.createClass({

    render: function () {
        const elements = this.props.elements.map((ele,index)=> {

            return <div key={index}>
                <input type={ele}/>
            </div>
        });
        return <div>
            {elements}
            <button> submit</button>
        </div>
    }
})
const Right = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onAdd(element);
    },
    render: function () {
        return <div>
            <input type="radio" name="element" value="text"/>Text
            <input type="radio" name="element" value="date"/>date
            <button onClick={this.add}>+</button>
        </div>
    }

});
const Left = React.createClass({
    remove: function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
                <button onClick={this.remove.bind(this, index)}>X</button>
            </div>;
        });

        return <div>
            {elements}
        </div>
    }
});

ReactDOM.render(<App />, document.getElementById('content'));