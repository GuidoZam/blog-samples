# Rubber Duck Debugging Assistant 🐤

Meet your new debugging companion! This declarative agent acts as a "rubber duck" - inspired by the classic programming practice where developers explain their code problems out loud to uncover issues and clarify their thinking. Instead of talking to an actual rubber duck on your desk, you can now interact with an AI-powered debugging assistant that listens patiently and asks thoughtful questions to guide you toward solutions.

## What is Rubber Duck Debugging?

Rubber duck debugging is a method where programmers explain their code line-by-line to an inanimate object (traditionally a rubber duck) to identify bugs and logical errors. By verbalizing the problem, developers often discover the solution themselves. This agent brings that concept to life with intelligent, guided questioning.

## Get started with the template

> **Prerequisites**
>
> To run this app template in your local dev machine, you will need:
>
> - [Node.js](https://nodejs.org/), supported versions: 18, 20, 22
> - A [Microsoft 365 account for development](https://docs.microsoft.com/microsoftteams/platform/toolkit/accounts).
> - [Microsoft 365 Agents Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [Microsoft 365 Agents Toolkit CLI](https://aka.ms/teamsfx-toolkit-cli)
> - [Microsoft 365 Copilot license](https://learn.microsoft.com/microsoft-365-copilot/extensibility/prerequisites#prerequisites)

![image](https://github.com/user-attachments/assets/51a221bb-a2c6-4dbf-8009-d2aa20a1638f)

1. First, select the Microsoft 365 Agents Toolkit icon on the left in the VS Code toolbar.
2. In the Account section, sign in with your [Microsoft 365 account](https://docs.microsoft.com/microsoftteams/platform/toolkit/accounts) if you haven't already.
3. Select `Preview Local in Copilot (Edge)` or `Preview Local in Copilot (Chrome)` from the launch configuration dropdown.
4. Select your **Rubber Duck** declarative agent from the `Copilot` app.
5. Start debugging! Try asking questions like:
   - "My function isn't returning what I expected"
   - "I'm getting a weird error and I'm not sure why"
   - "Can you help me understand why this code isn't working?"

The agent will always respond with 🐤 and guide you through the debugging process with thoughtful questions.

## What's included in the template

| Folder       | Contents                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------- |
| `.vscode`    | VSCode files for debugging                                                               |
| `appPackage` | Templates for the application manifest, the GPT manifest and the API specification |
| `env`        | Environment files                                                                        |

The following files can be customized and demonstrate an example implementation to get you started.

| File                               | Contents                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `appPackage/declarativeAgent.json` | Defines the Rubber Duck agent's behavior and configurations.            |
| `appPackage/instruction.txt`       | Contains the detailed instructions that make the agent act as a debugging assistant. |
| `appPackage/manifest.json`         | Application manifest that defines metadata for your Rubber Duck agent. |

The following are Microsoft 365 Agents Toolkit specific project files. You can [visit a complete guide on Github](https://github.com/OfficeDev/TeamsFx/wiki/Teams-Toolkit-Visual-Studio-Code-v5-Guide#overview) to understand how Microsoft 365 Agents Toolkit works.

| File           | Contents                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `m365agents.yml` | This is the main Microsoft 365 Agents Toolkit project file. The project file defines two primary things: Properties and configuration Stage definitions. |

## How the Rubber Duck Agent Works

### Key Features
- **Patient Listening**: The agent encourages you to explain your problem step-by-step
- **Guided Questions**: Instead of giving direct answers, it asks thoughtful questions that lead you to the solution
- **Problem Breakdown**: Helps break complex issues into smaller, manageable parts
- **Non-judgmental**: Creates a safe space to think through problems without feeling rushed

### Interaction Style
Every response starts with 🐤 and follows a structured approach:
1. **Clarification First**: Asks you to describe the problem in your own words
2. **Step-by-Step Exploration**: Guides you through your code flow
3. **Hypothesis Building**: Helps you form possible explanations
4. **Narrowing Down**: Suggests ways to isolate and test components
5. **Gentle Nudging**: Provides hints only when you're truly stuck

### Example Interactions
**You**: "My loop isn't working correctly"

**🐤**: "Can you walk me through what this loop is supposed to do? What do you expect to happen on each iteration?"

**You**: "It should process each item in the array, but it's skipping some items"

**🐤**: "Interesting! What's happening to your loop counter? Are you modifying the array or the counter inside the loop?"

## Extend the agent

- [Add conversation starters](https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents?tabs=ttk&tutorial-step=3): Conversation starters are hints that are displayed to the user to demonstrate how they can get started using the declarative agent.
- [Add web content](https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents?tabs=ttk&tutorial-step=4) for the ability to search web information.
- [Add OneDrive and SharePoint content](https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents?tabs=ttk&tutorial-step=5) as grounding knowledge for the agent.
- [Add Microsoft Copilot connectors content](https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents?tabs=ttk&tutorial-step=6) to ground agent with enterprise knowledge.
- [Add API plugins](https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents?tabs=ttk&tutorial-step=7) for agent to interact with REST APIs.

## Addition information and references

- [Declarative agents for Microsoft 365](https://aka.ms/teams-toolkit-declarative-agent)
