const { Schema, model, models } = require("mongoose");
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: pass => {
            if (!pass || pass.length < 5) {
                throw new Error('password must be at least 5 characters');
            }
        },
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    // Encriptar la contraseña directamente
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export const User = models?.User || model('User', UserSchema);
