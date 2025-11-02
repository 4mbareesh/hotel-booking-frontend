function FeaturesSection() {
  const features = [
    {
      icon: "🏨",
      title: "Premium Accommodations",
      description:
        "Handpicked hotels and resorts that meet our highest standards for comfort and luxury.",
    },
    {
      icon: "🔒",
      title: "Secure Booking",
      description:
        "Your personal and payment information is protected with industry-leading security measures.",
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      description:
        "Find a lower price elsewhere? We'll match it and give you an additional discount.",
    },
    {
      icon: "⭐",
      title: "5-Star Service",
      description:
        "Our dedicated support team is available 24/7 to assist with any questions or concerns.",
    },
    {
      icon: "📱",
      title: "Easy Management",
      description:
        "Manage your bookings, check-in times, and special requests all from one convenient platform.",
    },
    {
      icon: "🌍",
      title: "Global Network",
      description:
        "Access to thousands of properties worldwide, from boutique hotels to luxury resorts.",
    },
  ];

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-foreground lg:text-4xl">
            Why Choose BookMyStay?
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
            We make travel planning effortless with our comprehensive platform
            designed for modern travelers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-muted p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-3 font-semibold text-foreground text-xl">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
