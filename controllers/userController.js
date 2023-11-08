const { User, Thought } = require('../models');

module.exports = {
  // Get all courses
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v').populate('thoughts').populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      User.findById(req.params.userId, function (err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          user.friends.push(req.params.friendId);
          user.save(function(err) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send('Friend added');
            }
          })
        }
      })
    } catch (err) {
      res.status(500).send(err);
    }
   },
  
  // delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
   
      if (!user) {
        return res.status(404).send('User not found');
      }
   
      res.status(200).send('Friend removed successfully');
    } catch (err) {
      res.status(500).send(err);
    }
   }};
