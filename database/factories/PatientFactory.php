<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
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
            'doctor_id'  => $this->faker->randomElement([1,2,3,4,5]),
        ];
    }
}
