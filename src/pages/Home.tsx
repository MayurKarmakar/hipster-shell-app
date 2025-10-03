import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="space-y-4 text-center py-6 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Book Your Movie Tickets Online
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
          Experience the easiest way to book movie tickets. Browse latest movies, select your seats, and enjoy the show.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
          <Link to="/booking">
            <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base">
              Book Tickets Now
            </Button>
          </Link>
          <Link to="/bookings">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base">
              View My Bookings
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">Features</h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Browse Movies</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Latest releases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Discover the latest movies playing in theaters near you with detailed information and showtimes.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Easy Booking</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Simple process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Book your tickets in just a few clicks. Select movie, date, time, and seats with our intuitive interface.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Manage Bookings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Track your tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                View, modify, or cancel your bookings anytime. Keep track of all your movie plans in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Secure Authentication</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Create your account to save preferences, view booking history, and get personalized recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Analytics & Reports</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                View detailed analytics and reports about your booking patterns and favorite movie preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Multiple Theaters</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Wide coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Choose from multiple theaters and cinema halls across different locations for your convenience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">1. Create an Account</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sign up to access all features and manage your bookings easily.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">2. Browse Movies</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore the latest movies and find the perfect show for you.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">3. Book Your Tickets</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Select your preferred date, time, and seats, then complete your booking.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/login">
              <Button className="w-full sm:w-auto text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}