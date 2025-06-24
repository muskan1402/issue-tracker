        "use client";
        import SimpleMDE from "react-simplemde-editor";
        import { useForm, Controller } from "react-hook-form";
        import axios from "axios";
        import "easymde/dist/easymde.min.css";
        import { Callout, TextField} from "@radix-ui/themes";
        import "@radix-ui/themes/styles.css";
        import { Button } from "@radix-ui/themes";
    import { useRouter } from "next/navigation";
    import { useState } from "react";
        import {zodResolver} from '@hookform/resolvers/zod'
import { createissueschema } from "@/app/createissueschema";
import {z} from 'zod' ;

type Issueform= z.infer<typeof createissueschema>

        export default function NewIssuePage() {
            const router = useRouter();
            const [error, setError] = useState('');

            const{register,control, handleSubmit, formState:{errors}} = useForm<Issueform>({
                resolver: zodResolver(createissueschema)
            });
        return (
            <div>
                {error && <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>}
            <form className='max-w-xl space-y-6 p-4 bg-amber-400'
            onSubmit={handleSubmit(async(data) =>{
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues');
    
                } catch (error) {
                    setError('An expected error')
                            }
            
            })} >
            <div><p className="flex text-1xl">*These fields are compulsory</p></div>
            <TextField.Root placeholder="Enter title..." {...register('title')}/>
            {errors.title && <p className="text-red-400">{errors.title.message}</p>}
                <Controller name="description"
                control={control}
                render={({field}) =><SimpleMDE placeholder="Reply to comment…"{...field} />}
                />
                
            {errors.description && <p className="text-red-400">{errors.description.message}</p>}
            <Button type="submit">Submit new</Button>
            
            </form>
            </div>
            
        );
        }
