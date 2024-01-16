// Imports the Google Cloud Tasks library.
// const { CloudTasksClient } = require("@google-cloud/tasks");

export const triggerBeReal = async (req: any, res: any) => {
  //   // TODO(developer): Uncomment these lines and replace with your values.
  // const project = "trx-traklist";
  // const location = "europe-west1";
  // const queue = "BE-REAL-TRIGGER";
  // const tasksClient = new CloudTasksClient();
  // const queuePath: string = tasksClient.queuePath(project, location, queue);
  // const url = `https://${location}-${project}.cloudfunctions.net/ViewBeRealNotification`;
  // const payload = "trigger notification in 5 mins";
  // const task = {
  //   httpRequest: {
  //     httpMethod: "POST",
  //     url,
  //     body: Buffer.from(JSON.stringify(payload)).toString("base64"),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  //   scheduleTime: {
  //     seconds: 300 + Date.now() / 1000,
  //   },
  // };
  // const [response] = await tasksClient.createTask({ parent: queuePath, task });
};
