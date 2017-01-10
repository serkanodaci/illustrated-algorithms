import React from 'react';
import isEqual from 'lodash.isequal';
import bfs from '../algorithms/bfs';
import Layout from '../components/layout';
import SourceCode from '../components/source-code';
import Preview from '../components/preview';

class BinarySearch extends React.Component {
  static async getInitialProps() {
    const graph = {
      you: ['alice', 'bob', 'claire'],
      bob: ['anuj', 'peggy'],
      alice: ['peggy'],
      claire: ['thom', 'jonny'],
      anuj: [],
      peggy: [],
      thom: [],
      jonny: [],
    };

    return bfs(graph, 'you');
  }

  constructor(props) {
    super(props);

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      stepIndex: 0,
    };
  }

  handlePrev() {
    this.setState({
      stepIndex: this.state.stepIndex - 1,
    });
  }

  handleNext() {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
    });
  }

  render() {
    const { steps, code, url } = this.props;
    const { stepIndex } = this.state;

    const { line, start, end, bindings, returnValue } = steps[stepIndex];
    const prevStep = steps[stepIndex - 1];
    const prevBindings = prevStep ? prevStep.bindings : {};

    return (
      <Layout color="#80D8FF" pathname={url.pathname}>
        <div>
          <button disabled={stepIndex <= 0} onClick={this.handlePrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={this.handleNext}>forward</button>
        </div>
        <SourceCode
          def={code}
          line={line}
          start={start}
          end={end}
          />
        <Preview
          bindings={bindings}
          changedKeys={Object.keys(bindings).filter(key => !isEqual(bindings[key], prevBindings[key]))}
          returnValue={returnValue}
          />
        {returnValue !== undefined && (
          <pre style={{ backgroundColor: 'gray', color: 'white' }}>
            Return: {JSON.stringify(returnValue)}
          </pre>
        )}
      </Layout>
    );
  }
}

BinarySearch.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default BinarySearch;