export type CreateTestInstanceResponse =
  | {
      success: true;
      sessionCode: string;
    }
  | {
      success: false;
      error: string;
      message: string;
    };
