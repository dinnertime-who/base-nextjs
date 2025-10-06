import {
  createFormHook,
  createFormHookContexts,
  AnyFieldApi,
} from "@tanstack/react-form";
import { TextField } from "./app-fields/text-field";
import { NumberField } from "./app-fields/number-field";
import { PasswordField } from "./app-fields/password-field";

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    PasswordField,
  },
  formComponents: {
    SubmitButton: (props) => (
      <>
        <button type="submit" {...props} />
      </>
    ),
  },
  fieldContext,
  formContext,
});

export { useAppForm, withForm, withFieldGroup };
export { useFieldContext };
