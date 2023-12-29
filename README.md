# Code Challenge - Develop a React Native App

## Workflow Entity:
A workflow is a graph, composed of nodes that connect to each other in a unidirectional way
(Each node connects to the next). Also, each node can have multiple incoming and outgoing
nodes to which it connects, depending on the type of node.
A workflow can be composed of the following types nodes:
   - Init Node: Starting node. One per Workflow, without incoming links.
   - End Node: Ending node. One per Workflow, without outgoing links.
   - Conditional Node: At least one per Workflow. Has outgoing and incoming nodes.
   - Action Node: At least one per Workflow. Has outgoing and incoming nodes.
A valid workflow can be composed of any number of nodes as long as it has the required
number of each type of node.

## Functional Requirements:
The application has to fulfill the following functional requirements:
- A user should be able to create, edit, and delete a Workflow.
- Each workflow can be displayed in a graphical way where each node is properly
represented.
- Animations should be implemented in at least two parts of the application.
Recommended(but not restricted to): Splash animation and loader.
- Session management: the state of the app has to be saved constantly so even if the
user closes the application, they recover the data with no problems.

## How to start project

`yarn android` for android
`yarn ios` for iOS
