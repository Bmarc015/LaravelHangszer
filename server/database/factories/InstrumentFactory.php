<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instrument>
 */
class InstrumentFactory extends Factory
{

    protected array $instrumentName = [
        ['name' => "zongora"],
        ['name' => "gitár"],
        ['name' => "hegedű"],
        ['name' => "brácsa"],
        ['name' => "cselló"],
        ['name' => "nagybőgő"],
        ['name' => "fuvola"],
        ['name' => "klarinét"],
        ['name' => "oboa"],
        ['name' => "fagott"],
        ['name' => "szaxofon"],
        ['name' => "trombita"],
        ['name' => "kürt"],
        ['name' => "harsona"],
        ['name' => "tuba"],
        ['name' => "dob"],
        ['name' => "marimba"],
        ['name' => "xilofon"],
        ['name' => "ütőgardon"],
        ['name' => "harmonika"],
        ['name' => "orgona"],
        ['name' => "szintetizátor"],
        ['name' => "ukulele"],
        ['name' => "mandolin"],
        ['name' => "banjo"],
        ['name' => "hárfa"],
        ['name' => "koto"],
        ['name' => "tambura"],
        ['name' => "skót duda"],
        ['name' => "oud"]
    ];

    protected function withFaker()
    {
        // Manuális beállítás az app config felülírására
        return \Faker\Factory::create('en_EN');
    }


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomInstrument = $this->faker->randomElement($this->instrumentName);

        return [
            //       
            'name' => $randomInstrument['name'], 
            'description' => $this->faker->sentence(),
            'brand' => $this->faker->company(),
            'price' => $this->faker->numberBetween(500, 5000), 
            'quantity' => $this->faker->numberBetween(0, 1000), 

        ];
    }
}
