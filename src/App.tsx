import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(5),
  age: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  address: z.string(),
});

type FormFields = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      address: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", { message: "The email is already taken" });
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        className="p-3 rounded-md outline-none"
      />
      {errors.username && (
        <div className="text-red-600">{errors.username.message}</div>
      )}

      <input
        {...register("age")}
        type="number"
        placeholder="Age"
        className="p-3 rounded-md outline-none"
      />
      {errors.age && <div className="text-red-600">{errors.age.message}</div>}

      <input
        {...register("email")}
        type="text"
        placeholder="Email"
        className="p-3 rounded-md outline-none"
      />
      {errors.email && (
        <div className="text-red-600">{errors.email.message}</div>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="p-3 rounded-md outline-none"
      />
      {errors.password && (
        <div className="text-red-600">{errors.password.message}</div>
      )}

      <input
        {...register("address")}
        type="text"
        placeholder="Address"
        className="p-3 rounded-md outline-none"
      />
      {errors.address && (
        <div className="text-red-600">{errors.address.message}</div>
      )}

      <button disabled={isSubmitting} type="submit" className="bg-blue-600">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <div className="text-red-600">{errors.root.message}</div>}
    </form>
  );
}

export default App;
