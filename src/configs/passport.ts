import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {getUserRepository} from "../repositories/user.repository.ts";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await getUserRepository().findOne({ where: { username } });

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await user.validatePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await getUserRepository().findOne({ where: { id: payload.id } });

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

export default passport;
