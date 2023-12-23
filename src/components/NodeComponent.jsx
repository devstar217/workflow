import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Svg, Line} from 'react-native-svg';
import shortid from 'shortid';

const nodeSize = 70;
const space = 30;

const LineConnector = ({start, end}) => {
  const {x: x1, y: y1} = start;
  const {x: x2, y: y2} = end;

  return (
    <Svg style={styles.line}>
      <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
    </Svg>
  );
};

const NodeComponent = ({nodes}) => {
  let maxX = [];
  let lastChilds = [];

  const getInitNode = () => nodes.filter(item => item.type === 1)[0];
  const getEndNode = () => nodes.filter(item => item.type === 2)[0];
  const getChildNodes = nodeData =>
    nodes.filter(item => item.parent === nodeData.name);

  const drawEnd = () => {
    const endNode = getEndNode();

    const nodePosY =
      nodes.length === 2 ? nodeSize + space : maxX.length * (nodeSize + space);
    const nodePosX = 0;

    return (
      endNode && (
        <React.Fragment key={shortid.generate()}>
          <View
            key={shortid.generate()}
            style={[
              styles.nodeStyle[endNode.type - 1],
              {top: nodePosY, left: nodePosX},
            ]}
            zIndex={10}>
            <Text style={styles.text}>{endNode.name}</Text>
          </View>
          {lastChilds.map((item, index) => (
            <React.Fragment key={shortid.generate()}>
              <LineConnector
                start={{
                  x: item.x + nodeSize * 0.5,
                  y: item.y + nodeSize,
                }}
                end={{
                  x: item.x + nodeSize * 0.5,
                  y: nodePosY - 0.5 * nodeSize,
                }}
                zIndex={-99}
              />
              <LineConnector
                start={{
                  x: nodePosX + nodeSize * 0.5,
                  y: nodePosY,
                }}
                end={{
                  x: item.x + nodeSize * 0.5,
                  y: nodePosY - 0.5 * nodeSize,
                }}
                zIndex={-99}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      )
    );
  };

  const drawNode = (targetNode, depth, parentX) => {
    const childs = getChildNodes(targetNode);
    const childNum = childs.length;
    let xPos;

    if (targetNode.type === 1) {
      xPos = 0;
    } else {
      if (!(maxX[depth] > 0)) maxX[depth] = 0;
      if (parentX > maxX[depth]) xPos = parentX;
      else {
        xPos = maxX[depth];
        maxX[depth]++;
      }
    }

    const nodePosY = depth * (nodeSize + space);
    const nodePosX = xPos * (nodeSize + space);

    if (!childNum)
      lastChilds.push({
        node: targetNode,
        x: nodePosX,
        y: nodePosY,
      });
    // Render the current node before rendering its children
    const currentNode = (
      <React.Fragment key={shortid.generate()}>
        <View
          style={[
            styles.nodeStyle[targetNode.type - 1],
            {top: nodePosY, left: nodePosX},
          ]}
          zIndex={10}>
          <Text style={styles.text}>{targetNode.name}</Text>
        </View>
        {targetNode.type !== 1 && (
          <LineConnector
            start={{
              x: (nodeSize + space) * parentX + nodeSize * 0.5,
              y: (depth - 1) * (nodeSize + space) + nodeSize,
            }}
            end={{x: nodePosX + 0.5 * nodeSize, y: nodePosY}}
            zIndex={-99}
          />
        )}
      </React.Fragment>
    );

    // Render child nodes recursively
    const childNodes = [];
    for (let i = 0; i < childNum; i++) {
      childNodes.push(drawNode(childs[i], depth + 1, xPos));
    }

    // Return an array with the current node followed by its children
    return [currentNode, ...childNodes];
  };

  const nodeElements = drawNode(getInitNode(), 0, 0);
  const endDraw = drawEnd();
  return <>{[...nodeElements, endDraw]}</>;
};

const styles = StyleSheet.create({
  nodeStyle: [
    {
      width: nodeSize,
      height: nodeSize,
      borderRadius: nodeSize / 2,
      backgroundColor: '#b2d1a3',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
    {
      width: nodeSize,
      height: nodeSize,
      borderRadius: nodeSize / 2,
      backgroundColor: '#e09390',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
    {
      width: nodeSize,
      height: nodeSize,
      backgroundColor: '#cbddef',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
    {
      width: nodeSize,
      height: nodeSize,
      backgroundColor: '#fae298',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
  ],
  line: {
    position: 'absolute',
  },
  text: {
    color: 'white',
  },
});

export default NodeComponent;
