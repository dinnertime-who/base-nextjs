import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./field-components/text-field";
import { NumberField } from "./field-components/number-field";
import { PasswordField } from "./field-components/password-field";
import { SubmitButton } from "./form-components/submit-button";
import { Fieldset } from "./form-components/fieldset";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    PasswordField,
  },
  formComponents: {
    SubmitButton,
    Fieldset,
  },
  fieldContext,
  formContext,
});

export { useAppForm, withForm, withFieldGroup };
export { useFieldContext, useFormContext };
