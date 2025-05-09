"use client";
import { useForm, zodResolver } from '@mantine/form';
import { Button, Group, Paper, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';
import { LoginSchema } from '../lib/schema';

export default function LoginForm() {
  
  const form = useForm({
	mode: 'uncontrolled',
	initialValues: {
	  username: "",
	  password: ""
	},
	validate: zodResolver(LoginSchema),
	onSubmitPreventDefault: 'validation-failed',
  });

  return (
	<form 
	  onSubmit={() => form.setSubmitting(true)}
	  action={ async (formData: FormData) => {
		form.validate()
		if(form.isValid()) {
			console.log(form)
		}
		form.setSubmitting(false);
		form.resetDirty();
	}}>
	  <Paper
		withBorder
		component={Stack}
		p="md"
		w={350}
	  >
		<TextInput
		  label="Email"
		  name='email'
		  placeholder="flowacademy@email.com"
		  key={form.key("email")}
		  {...form.getInputProps('email')}
		/>
		<PasswordInput
		  label="Password"
		  name='password'
		  key={form.key("password")}
		  {...form.getInputProps('password')}
		/>
		<Group justify="center" mt="md">
		  <Button variant="default" type="submit" disabled={!form.isDirty()} loading={form.submitting}>Sign in</Button>
		</Group>
	  </Paper>
	</form>
  )
}