/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(5, 5);
        this.maxVel.y = 15;
        this.accel.y = 100;
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
 
    update: function(dt) {
        if (me.input.isKeyPressed('left')) {
            this.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

        if (me.input.isKeyPressed('jump')) {
            if (!this.jumping && !this.falling) {
                console.log(this.maxVel.y)
                this.vel.y = -this.maxVel.y * me.timer.tick;
                this.jumping = true;
                me.audio.play("jump");
            }
        }

        if (me.input.isKeyPressed('down')) {
            if (true) {
                console.log(this.maxVel.y)
                this.vel.y = +this.maxVel.y * me.timer.tick;
                this.jumping = true;
                me.audio.play("stomp");
            }
        }

        this.updateMovement();

        me.game.world.collide(this);
 
        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent(dt);
            return true;
        }

        return false;
    }
 
});

/*----------------
 a Coin entity
------------------------ */
game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(res, obj) {
        // do something when collected
        console.log('collided');
         game.data.score += 250;
         me.audio.play("cling");
 

        // make sure it cannot be collected "again"
        this.collidable = true;
        // remove it
        me.game.world.removeChild(this);
    }

 
});

game.boxEntity = me.ObjectEntity({
     init: function(x, y, settings) {
        
    },
    update: function(dt) {
        this.updateMovement();

        me.game.world.collide(this);
    }
})


