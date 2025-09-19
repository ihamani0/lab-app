<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'name'    => $this->faker->name(),
            'address' => $this->faker->address(),
            'phone'   => $this->faker->phoneNumber(),
            'email'   => $this->faker->unique()->safeEmail(),
            'cabine'  => $this->faker->randomElement(['A1', 'B2', 'C3', 'D4', 'E5']),
        ];
    }
}
