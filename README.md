# AI Adoption Metrics

Welcome to [AI Adoption Metrics](https://aiadoptionmetrics.com/) - an open-source project designed to understand the intricacies of how, why, and when users are interacting with Language Learning Models (LLMs). Our focus is on analyzing conversations from various chat interfaces such as ChatGPT, Team-GPT, and Claude, providing insights into AI adoption and usage.


<img width="1344" alt="image" src="https://github.com/team-gpt/ai-adoption-metrics/assets/60155068/9729dcf3-79ef-4b85-8b57-2133c3b2d739">

## Features

- **Out-of-the-Box Compatibility**: Designed to work seamlessly with Team-GPT, ChatGPT and other LLMs
- **Custom Integration**: For incorporating other projects, refer to our comprehensive documentation for data preparation and preprocessing guidelines.
- **Advanced Analytics**: We use Claude for its extensive context capabilities to deliver detailed reports.
- **Intelligent Summarization**: Our system expertly chunks and summarizes conversations to stay within LLM context limits.
- **Engineered Prompting**: A default prompt is crafted to elicit intelligent and contextually relevant responses from the AI. This prompt can be customized as needed.
- **Email Integration**: Post-report creation, an automated email can be sent to users. While we assume you have a native system for transactional emails, we recommend tools like Zapier for automation if needed.
- **Insightful Reports**: Generate detailed reports on AI adoption and usage patterns.
- **Chat Analysis**: Input your team's chat data to extract meaningful AI engagement metrics.
- **Usage Trends**: Discover trends in AI model usage and preferences.
- **Actionable Insights**: Identify opportunities to increase efficiency and AI adoption within your team.

## Built With
<img width="965" alt="image" src="https://github.com/team-gpt/ai-adoption-metrics/assets/60155068/bf3efd8b-e334-4e27-9247-254223aa226e">

- [Langchain](https://langchain.readthedocs.io/) - For seamless AI integration and processing.
- [Claude](https://claude.ai/) - Utilizing Anthropic's advanced language model for deep insights.
- [TypeScript](https://www.typescriptlang.org/) - Application written in TypeScript for robust and maintainable code.
- [AWS Lambda and API Gateway](https://aws.amazon.com/lambda/) - For scalable, on-demand cloud deployment.

![image](https://github.com/team-gpt/ai-adoption-metrics/assets/60155068/ec114fd0-722a-436a-a6f7-2878aae6b898)

## Getting Started

### Prerequisites

- Node.js
- Anthropic API key
- AWS account
  
### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ai-adoption-metrics.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ai-adoption-metrics
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Run deploy package:
   ```sh
   npm run deploy
   ```
5. Unarchive
6. Archive `node_modules` as well as the content in `dist` folder (without `dist` folder)

### Deployment

1. Create `AWS Lambda Function` - follow this [guide](https://aws.amazon.com/pm/lambda/) and add code from the `zip` you created
2. Add env variables - `ANTHROPIC_API_KEY` and `MODEL_TEMPERATURE`. `ZAPIER_URL` is required only if you would like to send the reports over email using Zapier.
3. You can use the Lambda in the preferred way for you, but I suggest using [API Gateway](https://us-west-1.console.aws.amazon.com/apigateway)
4. You can add authorization or leave the endpoint public

<img width="876" alt="image" src="https://github.com/team-gpt/ai-adoption-metrics/assets/60155068/9ac9df1e-4846-43d3-9d32-1c38d24ff0bd">


## Usage and Data Format for Endpoint
Invoke the Lambda. Here is the expected format of the data - an **array** of chats and optional `email` field.

| Key                  | Type     | Description                                 | Example                         |
|----------------------|----------|---------------------------------------------|---------------------------------|
| chats                | Array    | Array of message objects and model field    | See message object details below|
| email(optional)      | String   | The AI model being used                     | "GPT-3.5-turbo"                 |

The field the endpoint expects is `chats` and it is an array. 
The following table represents the chat JSON structure expected by the endpoint:

| Key       | Type     | Description                                 | Example                                  |
|-----------|----------|---------------------------------------------|------------------------------------------|
| messages  | Array    | Array of message objects                    | See message object details below         |
| model     | String   | The AI model being used                     | "GPT-3.5-turbo"                          |

### Message Object Format

Each object in the `messages` array should contain:

| Key      | Type   | Description                           | Example                                           |
|----------|--------|---------------------------------------|---------------------------------------------------|
| content  | String | The content of the message            | "Facebook ads or LinkedIn ads for a saas product" |
| role     | String | The role of the entity sending message| "user" or "assistant"                             |
| name     | String | The name of the sender                | "Maria Bailey" or "GPT-3.5-turbo"                 |

### Example JSON Payload

```json
[{
  "messages": [
    {
      "content": "Facebook ads or LinkedIn ads for a saas product",
      "role": "user",
      "name": "Maria Bailey"
    },
    {
      "content": "When deciding between Facebook ads and LinkedIn ads for a saas product",
      "role": "assistant",
      "name": "GPT-3.5-turbo"
    }
  ],
  "model": "GPT-3.5-turbo"
}]
```

## Send report over e-mail (optional)

<img width="459" alt="image" src="https://github.com/team-gpt/ai-adoption-metrics/assets/60155068/b40e4736-c6c7-443e-9e5f-86f487de945f">


If you would like, you can use our special Zapier [template](https://zapier.com/shared/ai-adoption-metrics-catch-response-and-send-email/74d902218661a6a2c8875c2334d5ea3a21d63e6e). You will need to set up a Zapier webhook and set `ZAPIER_URL` (env variable) within AWS. Then if you are using the API Gateway you can pass `email` which would be the email address of the person you would like to receive the report.

## Contributing

We believe in open source and encourage the community to contribute to AI Adoption Metrics. If you're interested in contributing, feel free to open a PR.

## History

AI Adoption Metrics was conceived and initiated at the AI SF Hackathon, reflecting our commitment to fostering AI integration in every team.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Kudos to the AI SF Hackathon organizers and participants who inspired this project.
- Special thanks to all contributors who have invested their time in advancing this project.

## Support

For support, please open an issue in the GitHub issue tracker or contact the maintainers directly.

We hope AI Adoption Metrics empowers you and your team to embrace AI more fully. Happy analyzing!
