import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const WelcomeModal = () => {
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md text-center px-8 py-10">
                <DialogHeader>
                    <DialogTitle className="font-heading text-3xl font-light text-foreground mb-4">
                        Welcome to Junebird
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                    <p>
                        Thank you for helping us bring Junebird to life! Junebird is a premium neighborhood prepared foods market with ingredients you trust and flavors you'll love. Our mission is to make it easy to eat well, any night of the week.
                    </p>
                    <p>
                        We're testing our menu and would love your honest input. Browse what we have to offer and place an order as if you were stocking up for yourself and your household this week — what would you actually buy?
                    </p>
                    <p>
                        Add your email at checkout to be first in line for our grand opening and future events. Thank you for being part of this!
                    </p>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className="mt-6 w-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    Browse the Menu
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default WelcomeModal;
