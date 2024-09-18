import StoreCard from "@/components/client/StoreCard"
import { Typography } from "@material-tailwind/react"

const Store = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center flex-wrap gap-10 py-10 px-24">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Store
        </Typography>
        <div className="flex justify-center flex-wrap gap-6">
          {[...Array(6)].map((_, i) =>
            <StoreCard key={i} />
          )}
        </div>
      </section>
    </main>
  )
}

export default Store