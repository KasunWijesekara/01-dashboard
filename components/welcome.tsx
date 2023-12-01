import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const welcome = () => {
  return (
    <div>
      <Alert>
        <AlertTitle>Welcome to Zero One AI Monitoring</AlertTitle>
        <AlertDescription>
          <p>
            Thank you for joining our platform. To view chat histories, please
            select a user from the list on the right. Our AI Assistants are
            dedicated to ensuring exceptional customer service.
          </p>
        </AlertDescription>
        <p className="font-semibold pt-3">
          Please click on a user from the sidebar to view the chat history.
        </p>
      </Alert>
    </div>
  );
};

export default welcome;
